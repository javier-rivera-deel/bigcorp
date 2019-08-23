export const setEmployeeObject = employee => {
	return {
		name: employee.first + " " + employee.last,
		attributes: {
			department: employee.department,
			office: employee.office
		},
		children: []
	};
};

export const findMiddlePosition = axis => {
	if (axis === "x") {
		return window.innerWidth / 3;
	} else {
		return window.innerHeight / 2;
	}
};

export const createDataTree = dataset => {
  let hashTable = {};
  let lowestManager = dataset[0].manager;

  dataset.forEach(aData => {
    if (lowestManager > aData.manager) lowestManager = aData.manager;

    hashTable[aData.id] = { ...aData, children: [] };
  });
  let dataTree = [];

  dataset.forEach(data => {

    if(hashTable.hasOwnProperty(data.manager)) {
      hashTable[data.manager].children.push(hashTable[data.id]);
    } else if (data.manager === lowestManager || data.id === lowestManager) {
        dataTree.push(hashTable[data.id]);
    } else {
    }
  });

  return dataTree;
};