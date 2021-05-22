import TypeScript from './icons/typescript';

type Props = {
  tagName: string;
};

const TagIcon = (props: Props) => {
  const tagName = props.tagName;

  if (tagName === 'typescript') {
    return (
      <div className="w-5">
        <TypeScript />
      </div>
    );
  }
};

export default TagIcon;
