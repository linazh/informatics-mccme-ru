import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import ProblemCell from './ProblemCell';
import ProblemColumnHeader from './ProblemColumnHeader';
import { processStandingsData } from '../../utils/standings';


const columnsBeforeProblems = [
  {
    title: '#',
    dataIndex: 'rowNumber',
    key: 'rowNumber',
    className: 'standingsTableRowNumberColumn',
  },
  {
    title: 'Участник',
    dataIndex: 'user',
    key: 'user',
    className: 'standingsTableUserColumn'
  },
];

const attemptsColumn = {
  title: 'Попыток',
  dataIndex: 'attempts',
  key: 'attempts',
  className: 'standingsTableAttemptsColumn'
};

const columnsAfterProblems = [
  {
    title: 'Всего',
    dataIndex: 'total',
    key: 'total',
    className: 'standingsTableTotalColumn'
  },
  attemptsColumn
];


const StandingsTableWrapper = styled.div`
  .ant-table-content { overflow-x: auto; }

  .standingsTableRowNumberColumn {
    white-space: nowrap;
    width: 1px;
  }

  .standingsTableUserColumn {
    white-space: nowrap;
  }

  .standingsTableProblemColumn, 
  .standingsTableTotalColumn, 
  .standingsTableAttemptsColumn {
    text-align: center;
    white-space: nowrap;
    width: 1px;

    &.highlighted {
      background: red;
    }
  }
`;

export class StandingsTable extends React.Component {
  static contextTypes = {
    statementId: PropTypes.number,
  };
  
  static propTypes = {
    problemId: PropTypes.number,
    maxDate: PropTypes.instanceOf(Date),
    statements: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    const { statementId } = context;
    const { problemId, maxDate } = props;

    this.state = {
      highlight: null,
    }
    this.initProblemColumns(statementId, problemId);
    this.initData({statementId, problemId, maxDate});

    this.initProblemColumns = this.initProblemColumns.bind(this);
    this.initData = this.initData.bind(this);
  }

  componentWillReceiveProps(props, context) {
    const { statementId: prevStatementId } = this.context;
    const { problemId: prevProblemId, maxDate: prevMaxDate } = this.props;

    const { statementId } = context;
    const { problemId, maxDate } = props;

    this.initProblemColumns(statementId, problemId);
    if (statementId !== prevStatementId || maxDate !== prevMaxDate) {
      this.initData({statementId, problemId, maxDate});
    }
  }

  initProblemColumns(statementId, problemId) {
    this.singleProblem = typeof problemId !== 'undefined';

    if (this.singleProblem) {
      this.columnsProblems = [
        {
          title: 'Результат',
          dataIndex: problemId,
          key: 'problem',
          className: 'standingsTableProblemColumn',
          render: ({score, create_time: time, attempts}) => <ProblemCell score={score} time={time} attempts={attempts} shrinkable={false} />,
        },
        attemptsColumn,
      ];
      this.defaults = {[problemId]: {}};
    } else {
      const statement = this.props.statements[statementId];
      if (!statement) {
        this.columnsProblems = [];
      } else {
        this.columnsProblems = _.map(statement.problems, (problem, rank) => ({
          title: <ProblemColumnHeader rank={rank} title={problem.name} />,
          dataIndex: problem.id,
          key: problem.id,
          className: 'standingsTableProblemColumn' + (this.state.highlight === problem.id ? 'highlighted' : ''),
          render: ({score, time, attempts}) => <ProblemCell score={score} time={time} attempts={attempts} />,
          onCell: () => ({
            onMouseEnter: () => this.setState({...this.state, highlight: problem.id}),
            onMouseLeave: () => this.setState({...this.state, highlight: null})
          })
        }));
        this.defaults = {};
        _.forEach(statement.problems, problem => this.defaults[problem.id] = {});
      }
    }
  }

  initData({statementId, problemId, maxDate}) {
    let standingsData = {};
    const standingsAttrs = {};
    if (maxDate) {
      standingsAttrs.maxDate = maxDate;
    }
    if (statementId) {
      const statement = this.props.statements[statementId];
      if (statement.participant) {
        const { start, duration } = statement.participant;
        standingsAttrs.startDate = new Date(start * 1000);
        standingsAttrs.endDate = new Date((start + duration) * 1000);
      }
      standingsData = _.get(this.props.statements, `[${statementId}].standings`, {});
    }
    this.data = _.sortBy(_.map(processStandingsData({data: standingsData, ...standingsAttrs}), (data, userId) => ({
      key: userId,
      user: data.firstname + ' ' + data.lastname,
      ...this.defaults,
      ...data.processed.summary,
      ...data.processed.problems,
    })), [value => -value.total, value => value.attempts]);
    this.data = _.map(this.data, (value, index) => ({...value, rowNumber: index + 1}));
  }

  render() {
    const columns = this.singleProblem 
      ? _.concat(columnsBeforeProblems, this.columnsProblems) 
      : _.concat(columnsBeforeProblems, this.columnsProblems, columnsAfterProblems)

    return (
      <StandingsTableWrapper>
        <Table
          bordered
          columns={columns}
          dataSource={this.data}
          pagination={false}
        />
      </StandingsTableWrapper>
    );
  }
}

export default connect(state => ({
  statements: state.statements,
})
)(StandingsTable);
