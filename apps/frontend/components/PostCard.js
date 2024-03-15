import React, {useCallback, useState} from 'react';
import {Avatar, Button, Card, List, Popover} from "antd";
import {EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import { Comment } from '@ant-design/compatible';
import PostCardContent from "./PostCardContent";

const PostCard = ({post}) => {
    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);

    const {me} = useSelector((state) => state.user)
    const id = me?.id;

    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
    }, [])
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, [])

    return (
        <div style={{marginBottom: 20}}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images}/>}
                actions={[
                    <RetweetOutlined key={"retweet"}/>,
                    liked
                        ? <HeartTwoTone key={"heart"} twoToneColor={"#eb2f96"} onClick={onToggleLike}/>
                        : <HeartOutlined key={"heart"} onClick={onToggleLike}/>,
                    <MessageOutlined key={"comment"} onClick={onToggleComment}/>,
                    <Popover key={"more"} content={(
                        <Button.Group>
                            {id && post.User.id === id ? <>
                                <Button>Edit</Button>
                                <Button type="danger">Delete</Button>
                            </> : <Button>Report</Button>}

                        </Button.Group>
                    )}>
                        <EllipsisOutlined/>
                    </Popover>
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content}/>} />
            </Card>
            {commentFormOpened && (
            <div>
                <CommentForm post={post}/>
                <List
                    header={`${post.Comments.length} comments`}
                    itemLayout="horizontal"
                    dataSource={post.Comments}
                    renderItem={(item) => (
                        <li>
                            <Comment
                                author={item.User.nickname}
                                avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                content={item.content}
                            />
                        </li>
                    )}
                />
            </div>
            )}
        </div>
    )
}

export default PostCard;