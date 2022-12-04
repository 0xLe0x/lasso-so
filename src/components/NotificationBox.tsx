import React from "react";
import cx from "classnames";

export type NotificationStatus = { error: boolean; text: string } | undefined;

const NotificationBox: React.FC<{
  notification: NotificationStatus;
}> = ({ notification }) =>
  notification ? (
    <div id="notification" className="mt-5">
      <div
        className={cx("px-3 py-2 rounded", {
          "bg-rose-100 text-rose-600": notification.error,
          "bg-emerald-100 text-emerald-600": !notification.error,
        })}
      >
        <span className="text-sm">
          {!notification.error && (
            <svg
              className="inline w-3 h-3 shrink-0 fill-current mr-2"
              viewBox="0 0 12 12"
            >
              <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
            </svg>
          )}
          {`${notification.error ? "✕ " : ""}${notification.text}`}
        </span>
      </div>
    </div>
  ) : null;

export default NotificationBox;
