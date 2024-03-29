import React, { useMemo } from 'react';
import { Card, List, Button } from 'antd';
import PropTypes from 'prop-types';
import { StopOutlined } from '@ant-design/icons';
import { style as FollowerListStyle } from '../styles/FollowerList.style';

function FollowList({ header, data }) {
  const style = useMemo(
    () => ({
      marginBottom: 20,
    }),
    [],
  );

  return (
    <List
      style={style}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={FollowerListStyle.btnDiv}>
          <Button>More</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={FollowerListStyle.list}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
