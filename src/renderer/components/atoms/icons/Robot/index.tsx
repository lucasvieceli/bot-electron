import { SVGProps } from 'react'

const IconRobot = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.716 11.643v0a4.035 4.035 0 0 0 2.852 4.941l2.099.562M24.284 11.643v0a4.035 4.035 0 0 1-2.853 4.941l-2.098.562"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={6.554}
        y={1.286}
        width={12.892}
        height={8.38}
        rx={4}
        stroke={props.color}
      />
      <path
        d="M7.034 20.417a5.795 5.795 0 0 1 5.778-6.24h.376a5.795 5.795 0 0 1 5.778 6.24 2.318 2.318 0 0 1-2.311 2.14h-7.31a2.318 2.318 0 0 1-2.311-2.14Z"
        stroke={props.color}
      />
      <rect
        width={4.19}
        height={2.256}
        rx={1.128}
        transform="matrix(1 0 0 -1 10.744 11.922)"
        stroke={props.color}
      />
      <rect
        width={4.19}
        height={2.256}
        rx={1.128}
        transform="matrix(1 0 0 -1 10.744 14.178)"
        stroke={props.color}
      />
      <path
        d="M9.777 20.946a3.223 3.223 0 0 1 6.446 0v1.612H9.777v-1.612Z"
        stroke={props.color}
      />
      <circle cx={9.777} cy={5.476} stroke={props.color} r={1.289} />
      <circle cx={16.223} cy={5.476} r={1.289} stroke={props.color} />
      <path
        d="M5.302 11.608a2.6 2.6 0 1 1-3.677-3.677M20.698 11.608a2.6 2.6 0 1 0 3.677-3.677"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconRobot
