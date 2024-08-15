const NotAllowed = () => {
    return (
      <div className="z-[100000] fixed top-0 right-0 left-0 bottom-0 h-screen w-screen bg-black/50 flex flex-col items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-10 ">
        <h1 className="font-bold">Inactive Subscription</h1>
        <p className="w-[] text-[12px] mt-4">Error getting active connection from MuseHub</p>
      </div>
    );
}

export default NotAllowed