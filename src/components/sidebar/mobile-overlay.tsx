import classNames from "classnames";

export function MobileOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={classNames("dashboard-layout__overlay", {
        "dashboard-layout__overlay--visible": isOpen,
      })}
      onClick={onClose}
      role="presentation"
      aria-hidden={!isOpen}
    />
  );
}
