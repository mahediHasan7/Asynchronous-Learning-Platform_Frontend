import { BeakerIcon } from '@heroicons/react/solid';

const SvgIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 ${props.className}`}
      style={{ width: props.size, height: props.size }}
      fill={props.fill}
      viewBox="0 0 24 24"
      stroke={props.color}
      onClick={props.onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={props.secondPath}
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props.strokeWidth}
        d={props.icon}
      />
    </svg>
  );
};

export default SvgIcon;
