function Home() {
  return (
    <div className="relative">
      <img
        className="w-full h-[calc(100vh-60px)] object-cover"
        alt="bg-home"
        src="https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <div className="absolute top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.7)]"></div>
      <h1 className="text-white text-[40px] font-bold  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Home Page
      </h1>
    </div>
  );
}

export default Home;
