import React from "react";

function TopicWordCloud({ tags = [] }) {
  if (!tags.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-lg font-semibold text-white">
          Topics Explored
        </h2>

        <p className="mt-6 text-sm text-slate-500">
          No quiz topics available yet.
        </p>
      </div>
    );
  }

  const maxCount = Math.max(...tags.map((tag) => tag.count));

  const getFontSize = (count) => {
    const minSize = 16;
    const maxSize = 42;

    return minSize + (count / maxCount) * (maxSize - minSize);
  };

  const getTagColor = (index) => {
    const hue = (index * 360) / tags.length;

    return `hsl(${hue}, 80%, 65%)`;
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-white">
          Topics Explored
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Bigger words represent topics you have explored more often.
        </p>
      </div>

      {/* Word Cloud */}
      <div
        className="
          mt-6
          flex
          min-h-[280px]
          flex-wrap
          items-center
          justify-center
          gap-x-6
          gap-y-4
          rounded-xl
          border border-white/5
          bg-slate-950/30
          p-6
        "
      >
        {tags.map((tag, index) => (
          <span
            key={tag.name}
            style={{
              fontSize: `${getFontSize(tag.count)}px`,
              color: getTagColor(index),
            }}
            className="
              cursor-default
              font-semibold
              transition-all
              duration-300
              hover:scale-110
            "
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TopicWordCloud;