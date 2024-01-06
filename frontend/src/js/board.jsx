import React from 'react';

const Board = ({ isAuthenticated, postUrl }) => {
    return (
        <div>
            <h1>게시판</h1>
            {isAuthenticated ? (
                <div>
                    <p>게시판 내용이 여기에 표시됩니다.</p>
                    <a href={postUrl}>글 쓰러 가기</a>
                </div>
            ) : (
                <p>로그인이 필요합니다.</p>
            )}
        </div>
    );
};

export default Board;