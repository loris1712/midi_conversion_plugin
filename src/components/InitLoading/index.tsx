import loadingGif from '@assets/loading.gif'
const InitLoading = () => (
    <div className="flex flex-col h-full w-full items-center justify-center">
        <img className='w-[180px]' src={loadingGif}/>
    </div>
)

export default InitLoading