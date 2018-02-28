import React from 'react';

import Box from '../../components/utility/Box';
import Button from '../../components/utility/Button';
import TeamTaskWrapper from '../../components/utility/TeamTaskWrapper';
import {
  gutter,
  colStyle,
  rowStyle,
  Col,
  Row,
} from '../../components/utility/Grid';

import Radio, {RadioGroup} from '../../isomorphic/components/uielements/radio'
import Popconfirm from '../../isomorphic/components/feedback/popconfirm'
import Alert from '../../isomorphic/components/feedback/alert'


export default class TeamTask extends React.Component {
  constructor() {
    super();
  }

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      fontSize: '14px',
      color: '#788195',
    };
    const text = 'Отправить выбранную команду?';
    //annIcon = <i style={{color: "#ff9d61"}} class="material-icons">announcement</i>

    return (
      <TeamTaskWrapper>
        <Row style={{marginBottom: '22px'}}>
          <Alert
            description="Какое-то предупреждение"
            type="warning"
            showIcon
            closeText={<Button type="primary" size="small">Закрыть</Button>}
          />
        </Row>
        <Box style={{height: 'auto'}}>
          <Row gutter={gutter} style={{...rowStyle, textAlign: 'left'}}>
            <Col md={12} xs={24} style={colStyle}>
              <div className="title_contest">Командный контест</div>
              <div className="text_block">
                На олимпиаде, в режиме командной олимпиады,
                три ученика пишут задачи за одним компьютером.
                Результаты команд хранятся отдельно от результатов учеников.
                Выберите команду справа или создайте новую.
              </div>
              <Button type="primary" size="medium">Создать команду</Button>
            </Col>
            <Col md={10} xs={12} style={colStyle}>
              <div className="title_team">Выберите команду</div>
              <RadioGroup style={{marginTop: '28.5px'}}>
                <Popconfirm placement="bottomRight" title={text} okText="Да" cancelText="Нет">
                  <Radio style={radioStyle} value={1}>Вариант 1 (Фамилия, Фамилия, Фамилия)</Radio>
                </Popconfirm>
                <Popconfirm placement="bottomRight" title={text} okText="Да" cancelText="Нет">
                  <Radio style={radioStyle} value={2}>Вариант 2 (Фамилия, Фамилия, Фамилия)</Radio>
                </Popconfirm>
                <Popconfirm placement="bottomRight" title={text} okText="Да" cancelText="Нет">
                  <Radio style={radioStyle} value={3}>Вариант 3 (Фамилия, Фамилия, Фамилия)</Radio>
                </Popconfirm>
                <Popconfirm placement="bottomRight" title={text} okText="Да" cancelText="Нет">
                  <Radio style={radioStyle} value={4}>Вариант 4 (Фамилия, Фамилия, Фамилия)</Radio>
                </Popconfirm>
              </RadioGroup>
              <Button type="primary" size="medium" style={{marginTop: '18px'}}>Показать все</Button>
            </Col>
          </Row>
        </Box>
      </TeamTaskWrapper>
    );
  }
}


