function BackgroundBlack({ children }) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-[100]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}

export default BackgroundBlack;
