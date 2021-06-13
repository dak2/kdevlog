import TypeScript from './icons/TypescriptIcon';
import React from './icons/ReactIcon';
import JavaScript from './icons/JavascriptIcon';
import Ruby from './icons/RubyIcon';
import Go from './icons/GoIcon';
import Rust from './icons/RustIcon';
import RubyOnRails from './icons/RailsIcon';
import AWS from './icons/AwsIcon';
import Docker from './icons/DockerIcon';

type Props = {
  tagName: string;
};

const TagIcon = (props: Props) => {
  const tagName = props.tagName;
  // TODO : リファクタリング
  if (tagName === 'TypeScript') {
    return (
      <div className="w-8">
        <TypeScript />
      </div>
    );
  } else if (tagName === 'React') {
    return (
      <div className="w-8">
        <React />
      </div>
    );
  } else if (tagName === 'JavaScript') {
    return (
      <div className="w-8">
        <JavaScript />
      </div>
    );
  } else if (tagName === 'Ruby') {
    return (
      <div className="w-8">
        <Ruby />
      </div>
    );
  } else if (tagName === 'Go') {
    return (
      <div className="w-8">
        <Go />
      </div>
    );
  } else if (tagName === 'Rust') {
    return (
      <div className="w-8">
        <Rust />
      </div>
    );
  } else if (tagName === 'Ruby on Rails') {
    return (
      <div className="w-8">
        <RubyOnRails />
      </div>
    );
  } else if (tagName === 'AWS') {
    return (
      <div className="w-9">
        <AWS />
      </div>
    );
  } else if (tagName === 'Docker') {
    return (
      <div className="w-8">
        <Docker />
      </div>
    );
  }
};

export default TagIcon;
