const NotAllowed = () => {
    return (
      <div className="z-[100000] fixed top-0 right-0 left-0 bottom-0 h-screen w-screen bg-black/50 flex flex-col items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-10 ">
        <h1 className="font-bold">Unauthorized</h1>
        <p className="w-[] text-[12px] mt-4">Please authorize via the Muse Hub and try again!</p>
      </div>
    );
}

export default NotAllowed