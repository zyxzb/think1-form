interface HeadingProps {
  text: string;
}

const Heading = ({ text }: HeadingProps) => {
  return (
    <h2 className='mb-[32px] text-[24px] font-medium text-textColor'>{text}</h2>
  );
};

export default Heading;
