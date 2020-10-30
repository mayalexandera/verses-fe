export const updateObject = (oldObject, updatedProperties) => {
  const new_state = {
    ...oldObject,
    ...updatedProperties,
  };
  return new_state
};
