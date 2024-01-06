import React from 'react';

const PostForm = ({ isAuthenticated, onSubmit }) => {
    return (
        <div>
            <h1>글 쓰기</h1>
            {isAuthenticated ? (
                <form onSubmit={onSubmit} enctype="multipart/form-data">
                    <label htmlFor="title">제목:</label>
                    <input type="text" name="title" required />
                    <br />
                    <label htmlFor="file">파일 업로드:</label>
                    <input type="file" name="file" required />
                    <br />
                    <label htmlFor="contents">내용:</label>
                    <textarea name="contents" required></textarea>
                    <br />
                    <label htmlFor="user_id">ID:</label>
                    <textarea name="user_id" required></textarea>
                    <br />
                    <button type="submit">글 올리기</button>
                </form>
            ) : (
                <p>로그인이 필요합니다.</p>
            )}
        </div>
    );
};

export default PostForm;