export const updateObject = (oldObject, updatedProperties) => {
  console.log(oldObject)
  const new_state = {
    ...oldObject,
    ...updatedProperties,
  };
  console.log(new_state)
  return new_state
};
