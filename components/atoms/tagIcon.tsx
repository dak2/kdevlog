import TypeScript from './icons/typescript';
import React from './icons/react';
import JavaScript from './icons/javascript';
import Ruby from './icons/ruby';
import Go from './icons/go';
import Rust from './icons/rust';
import RubyOnRails from './icons/rails';
import AWS from './icons/aws';
import Docker from './icons/docker';

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
  } else if (tagName === 'JavaScript') {
    return (
      <div className="w-5">
        <JavaScript />
      </div>
    );
  } else if (tagName === 'Ruby') {
    return (
      <div className="w-5">
        <Ruby />
      </div>
    );
  } else if (tagName === 'Go') {
    return (
      <div className="w-5">
        <Go />
      </div>
    );
  } else if (tagName === 'Rust') {
    return (
      <div className="w-5">
        <Rust />
      </div>
    );
  } else if (tagName === 'RubyOnRails') {
    return (
      <div className="w-5">
        <RubyOnRails />
      </div>
    );
  } else if (tagName === 'AWS') {
    return (
      <div className="w-5">
        <AWS />
      </div>
    );
  } else if (tagName === 'Docker') {
    return (
      <div className="w-5">
        <Docker />
      </div>
    );
  }
};

export default TagIcon;
