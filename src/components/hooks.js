const { useState, useEffect } = wp.element;

export const useStateProp = (stateProp, checkShouldUpdate = (newStateProp, state) => newStateProp !== state) => {
	const [state, setState] = useState(stateProp);
	useEffect(() => {
		if (checkShouldUpdate(stateProp, state)) setState(stateProp);
	}, [stateProp]);
	return [state, setState];
};

const externalContexts = new Map();
export const useExternalContext = (contextId, initialValue) => {
	// const [context, setContext] = useState(
	// 	externalContexts.has(contextId) ? externalContexts.get(contextId) : initialValue
	// );

	const context = externalContexts.has(contextId) ? externalContexts.get(contextId) : initialValue;
	const setContext = (value) => externalContexts.set(contextId, value);

	useEffect(() => {
		console.log("Updating context", { id: contextId, context, curr: externalContexts.get(contextId) });
		externalContexts.set(contextId, context);
		console.log("Updated context", { id: contextId, context: externalContexts.get(contextId) });
	}, [context]);
	return [context, setContext];
};

// export const useExternalContext = (contextId, initialValue) => {
// 	if (!externalContexts.has(contextId)) {
// 		externalContexts.set(contextId, initialValue);
// 	}
// 	return [
// 		externalContexts.get(contextId),
// 		(x) => {
// 			externalContexts.set(contextId, x);
// 		},
// 	];
// };
