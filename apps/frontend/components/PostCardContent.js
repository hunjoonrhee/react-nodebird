import React from 'react';
import Link from 'next/link';

const postCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s#]+)/)) {
        return (
          <Link href={`/hashtag/${v.slice(1)}`} key={i} passHref>
            {v}
          </Link>
        );
      }
      return v;
    })}
  </div>
);

export default postCardContent;
