// Your code



const handlePending = (state, action) => {
    state.isLoading = true;
    state.error = null;
  };
  
  const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload || action.error.message;
  };
  