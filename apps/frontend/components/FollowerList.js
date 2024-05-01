import React, { useMemo } from 'react';
import { Card, List, Button } from 'antd';
import PropTypes from 'prop-types';
import { StopOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { style as FollowerListStyle } from '../styles/FollowerList.style';
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../actions/index.js';

function FollowList({ header, data }) {
  const dispatch = useDispatch();

  const style = useMemo(
    () => ({
      marginBottom: 20,
    }),
    [],
  );

  const onClick = (id) => () => {
    if (header === 'Following') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  };

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
          <Card actions={[<StopOutlined key="stop" onClick={onClick(item.id)} />]}>
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
