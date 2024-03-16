import React, {useCallback} from "react";
import {Avatar, Card, Button} from "antd";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {logoutAction} from "../reducers/user";

const ButtonWrapper = styled(Button)`
  margin-top: 10px;
`;

const UserProfile = () => {
    const dispatch = useDispatch();
    const onLogOut = useCallback(() => {
        dispatch(logoutAction())
    }, []);

    return (
        <Card
            actions={[
                <div key="twit">
                    Twit <br/> 0
                </div>,
                <div key="followings">
                    Following <br/> 0
                </div>,
                <div key="followers">
                    Followers <br/> 0
                </div>,
            ]}
        >
            <Card.Meta avatar={<Avatar>HR</Avatar>} title="Hunjoon Rhee"/>
            <ButtonWrapper onClick={onLogOut}> Sign out</ButtonWrapper>
        </Card>
    );
};

export default UserProfile;
