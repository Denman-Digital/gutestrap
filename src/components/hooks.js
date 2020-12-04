const { useState, useEffect } = wp.element;

export const useStateProp = (stateProp, checkShouldUpdate = (newStateProp, state) => newStateProp !== state) => {
	const [state, setState] = useState(stateProp);
	useEffect(() => {
		if (checkShouldUpdate(stateProp, state)) setState(stateProp);
	}, [stateProp]);
	return [state, setState];
};
