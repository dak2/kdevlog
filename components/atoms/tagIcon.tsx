import TypeScript from './icons/typescript';
import React from './icons/react';

type Props = {
  tagName: string;
};

const TagIcon = (props: Props) => {
  const tagName = props.tagName;

  if (tagName === 'TypeScript') {
    return (
      <div className="w-5">
        <TypeScript />
      </div>
    );
  } else if (tagName === 'React') {
    return (
      <div className="w-5">
        <React />
      </div>
    );
  } else if (tagName === 'React') {
    return (
      <div className="w-5">
        <React />
      </div>
    );
  }
};

export default TagIcon;
