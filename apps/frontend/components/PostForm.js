import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';

function PostForm() {
  const dispatch = useDispatch();
  const imageInput = useRef(null);
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const [text, setText] = useState('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    dispatch(addPost(text));
  }, [text]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onClickImpageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="How are you?" />
      <div>
        <input type="file" multiple hidden ref={imageInput} style={{ display: 'none' }} />
        <Button onClick={onClickImpageUpload}>Image Upload</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          HAHAHA
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button> Delete </Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
}
export default PostForm;
