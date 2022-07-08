import '../scss/Dialog.scss';

function SimpleDialog({ status, message, onDialog }) {
  console.log(status);
  if (status === 'OK') {
    return (
      <div className="dialog-position fade-in " onClick={() => onDialog(false)}>
        <div className='dialog-box' onClick={(e) => e.stopPropagation()}>
          <div className='dialog-content p-8 rounded-lg text-center'>
            <h2 className='text-green-500 my-1 font-semibold text-2xl'>{status}</h2>
            <h3 className='my-4'>{message}</h3>
            <div >
              <button className='my-2 rounded-lg p-1 font-semibold' onClick={() => onDialog(true)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (

      <div className="dialog-position fade-in " onClick={() => onDialog(false)}>
        <div className='dialog-box' onClick={(e) => e.stopPropagation()}>
          <div className='dialog-content p-8 rounded-lg text-center'>
            <h2 className='text-red-500 my-1 font-semibold text-2xl'>{status}</h2>
            <h3 className='my-4'>{message}</h3>
            <div >
              <button className='my-2 rounded-lg p-1 font-semibold' onClick={() => onDialog(true)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

function ErrorDialog({ status, message, onDialog }) {
  return (
    <div className="dialog-position" onClick={() => onDialog(false)}>
      <div className='dialog-box' onClick={(e) => e.stopPropagation()}>
        <h2 className='text-red-500 my-1 font-semibold'>{status}</h2>
        <h3 className='my-3'>" {message}. "</h3>
        <div >
          <button className='my-2 rounded-lg p-1 font-semibold' onClick={() => onDialog(true)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export { SimpleDialog, ErrorDialog };
