"use client";

import { motion, useReducedMotion } from "motion/react";

const ORBIT = "M 12 100 a 88 34 0 1 0 176 0 a 88 34 0 1 0 -176 0";
const VUE_OUTER = "M0 0H51.2L128 132.48L204.8 0H256L128 220.8Z";
const VUE_INNER = "M50.56 0H97.92L128 51.2L157.44 0H204.8L128 133.12Z";
const EASE = [0.65, 0, 0.35, 1] as const;

export function ExpertiseVisual({ variant }: { variant: "react" | "vue" }) {
  const reduceMotion = useReducedMotion() ?? false;
  return variant === "react" ? (
    <ReactAtom reduceMotion={reduceMotion} />
  ) : (
    <VueLayers reduceMotion={reduceMotion} />
  );
}

function ReactAtom({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 200 200"
      className="size-full overflow-visible text-accent"
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
    >
      {[0, 60, 120].map((angle, index) => (
        <g key={angle} transform={`rotate(${angle} 100 100)`}>
          <motion.path
            id={`react-orbit-${index}`}
            d={ORBIT}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.55}
            strokeWidth={1.25}
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.2 + index * 0.25, ease: EASE }}
          />
          {!reduceMotion && (
            <circle r={3.5} fill="currentColor" opacity={0} className="drop-shadow-[0_0_6px_var(--accent)]">
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                begin={`${1.6 + index * 0.25}s`}
                dur="0.4s"
                fill="freeze"
              />
              <animateMotion
                dur={`${3.4 + index * 0.7}s`}
                begin={`${1.6 + index * 0.25}s`}
                repeatCount="indefinite"
              >
                <mpath href={`#react-orbit-${index}`} />
              </animateMotion>
            </circle>
          )}
        </g>
      ))}
      <motion.circle
        cx={100}
        cy={100}
        r={9}
        fill="currentColor"
        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
      />
    </motion.svg>
  );
}

function VueLayers({ reduceMotion }: { reduceMotion: boolean }) {
  const draw = (delay: number) => ({
    initial: reduceMotion ? false : { pathLength: 0, fillOpacity: 0 },
    animate: { pathLength: 1, fillOpacity: 1 },
    transition: {
      pathLength: { duration: 1.6, delay, ease: EASE },
      fillOpacity: { duration: 0.8, delay: delay + 1.2 },
    },
  });

  const drift = (distance: number) =>
    reduceMotion
      ? {}
      : {
          animate: { y: [0, distance, 0] },
          transition: { duration: 6, delay: 2.2, repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <svg aria-hidden viewBox="-24 -32 304 300" className="size-full overflow-visible text-accent">
      <motion.g
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? { opacity: 0.3 } : { opacity: 0.3, y: [28, 40, 28] }}
        transition={{
          opacity: { duration: 1, delay: 1.9 },
          y: { duration: 6, delay: 2.2, repeat: Infinity, ease: "easeInOut" },
        }}
        style={reduceMotion ? { y: 28 } : undefined}
      >
        <path d={VUE_OUTER} fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinejoin="round" />
      </motion.g>

      <motion.g {...drift(8)}>
        <motion.path
          d={VUE_OUTER}
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinejoin="round"
          style={{ fill: "color-mix(in oklab, var(--accent) 10%, transparent)" }}
          {...draw(0.2)}
        />
      </motion.g>

      <motion.g {...drift(-6)}>
        <motion.path
          d={VUE_INNER}
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinejoin="round"
          style={{ fill: "color-mix(in oklab, var(--accent) 22%, transparent)" }}
          {...draw(0.7)}
        />
      </motion.g>
    </svg>
  );
}
