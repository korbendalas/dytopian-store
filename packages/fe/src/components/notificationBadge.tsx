export type NotificationBadgeProps = {
  element: React.ReactNode;
  numberOfNotifications: number;
};

export const NotificationBadge = ({
  element,
  numberOfNotifications,
}: NotificationBadgeProps) => {
  return (
    <div className="relative py-2">
      {numberOfNotifications > 0 && (
        <div className=" absolute left-4 z-10">
          <p className=" flex h-1 w-1 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
            {numberOfNotifications}
          </p>
        </div>
      )}
      {element}
    </div>
  );
};
