

function InputField({ handleAddTodo, setInput, input, handleKeyPress }) {

  
    return (
        <>
        <div>
    
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
          <input
          onChange={(e)=>(setInput((e.target.value)))}
          onKeyDown={handleKeyPress}
          value={input}
            type="text"
            name="price"
            id="price"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter Your Todo Here"
          />
          <div className="absolute inset-y-0 right-0 flex items-center"><button onClick={handleAddTodo} type="button" className="btn btn-primary p-0.5">Add</button></div>
        </div>
      </div>
      </>
    )
}

export default InputField;