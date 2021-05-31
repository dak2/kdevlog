import TypeScript from './icons/Typescript';
import React from './icons/React';
import JavaScript from './icons/Javascript';
import Ruby from './icons/Ruby';
import Go from './icons/Go';
import Rust from './icons/Rust';
import RubyOnRails from './icons/Rails';
import AWS from './icons/Aws';
import Docker from './icons/Docker';

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
  } else if (tagName === 'Ruby on Rails') {
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
