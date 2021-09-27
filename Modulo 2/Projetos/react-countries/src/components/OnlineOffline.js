export function StatusCheckApp({ appStatus = true }) {
  return (
    <span className="text-xs text-white">
      {appStatus ? 'Online' : 'Offline'}
    </span>
  );
}
