import mock
from hamcrest import (
    assert_that,
    calling,
    equal_to,
    has_entries,
    raises,
)

from pynformatics import DBSession
from pynformatics.model.user import User
from source_tree.model.role import RoleAssignment
from pynformatics.model.problem_request import ProblemRequest
from pynformatics.utils.context import Context
from pynformatics.utils.exceptions import Forbidden, ProblemRequestNotFound, Unauthorized
from pynformatics.testutils import TestCase

from pynformatics.view.problem_request import problem_request_get


class TestView__problem_request_get(TestCase):
    def setUp(self):
        super(TestView__problem_request_get, self).setUp()

        self.admin_user = User()
        self.admin_user.user_id = 1
        self.user = User()
        self.user.user_id = 2
        self.session.add_all((self.admin_user, self.user))
        self.session.flush()

        self.create_roles()
        self.role_assignment = RoleAssignment(user_id=self.admin_user.user_id, role=self.admin_role)
        self.session.add(self.role_assignment)
        self.session.flush()

        self.problem_request = ProblemRequest(problem_id=1, user_id=2, name='name', content='content')
        self.session.add(self.problem_request)
        self.session.flush()

    def test_simple(self):
        self.request.matchdict['problem_request_id'] = self.problem_request.id

        context = Context(user_id=self.admin_user.user_id)

        response = problem_request_get(self.request, context)
        query = DBSession.query(ProblemRequest).filter(ProblemRequest.id == self.problem_request.id).first()
        assert_that(
            response,
            equal_to(query.serialize(context))
        )

    def test_no_problem_request(self):
        self.request.matchdict['problem_request_id'] = self.problem_request.id + 1

        context = Context(user_id=self.admin_user.user_id)

        assert_that(
            calling(problem_request_get).with_args(self.request, context),
            raises(ProblemRequestNotFound)
        )

    def test_not_admin(self):
        self.request.matchdict['problem_request_id'] = self.problem_request.id

        context = Context(user_id=self.user.user_id)

        assert_that(
            calling(problem_request_get).with_args(self.request, context),
            raises(Forbidden)
        )

    def test_unauthorized(self):
        context = Context(user_id=self.user.user_id + 1)

        assert_that(
            calling(problem_request_get).with_args(None, context),
            raises(Unauthorized)
        )
