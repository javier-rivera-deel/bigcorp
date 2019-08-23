export const getIds = tree => {
	return tree.map(person => person.manager);
};

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

export const getUniqueGenerations = generations => {
	return generations
		.sort((a, b) => b - a)
		.reduce((unique, item) => {
			return unique.includes(item) ? unique : [...unique, item];
		}, []);
};

export const getSiblingGroups = (employeesList, uniqueGenerations) => {
	const siblingGroups = [];
	for (let generation in uniqueGenerations) {
		const siblings = [];
		for (let person in employeesList) {
			if (uniqueGenerations[generation] === employeesList[person].manager) {
				siblings.push(setEmployeeObject(employeesList[person]));
			}
		}
		siblingGroups.push(siblings);
	}
	for (let group in siblingGroups) {
		const currentGroup = siblingGroups[group];

		// checks everygroup, another loop will be necesarry
		if (currentGroup.length > 0) {
			for (let sibling in currentGroup) {
				// I COULD DO JUST A FOR LOOP
				if (parseInt(group) < siblingGroups.length) {
					const previous = siblingGroups[parseInt(group) + 1];

					for (let child in previous) {
						if (currentGroup.length > 0) {
							if (
								previous[child].attributes.department ===
								currentGroup[sibling].attributes.department
							) {
								previous[child].children.push(currentGroup[sibling]);
								currentGroup.splice(sibling, 1);
							}
						}
					}
				}
			}
		}
	}
	return siblingGroups;
};

export const createDataTree = siblingGroup => {
	const parentIndex = siblingGroup.length - 1;
	const directChildrenIndex = siblingGroup.length - 2;
	const root = siblingGroup[parentIndex];
	root[0].children = siblingGroup[directChildrenIndex];
	return root;
};

// I COULD CREATE ARRAYS OF SIBLINGS THAT SHARES THE SAME MANAGER ID.
// THOSE SIBLINGS WILL BE CHILDREN OF NODES WITH THE SAME ID.

// LETS SAY I CREATE MY SIBLING GROUPS, STARTING WITH MY ROOT NODE
const siblingGroups = [
	{
		managerId: 1,
		siblings: []
	},
	{
		managerId: 2,
		siblings: []
	},
]
// WITH THIS, I COULD LOOP OVER THIS GROUPS, AND ATTACH THEM AS CHILDREN IF THE ID MATCHES
// BASICALLY I'M FINDING THE PARENT OF THE GROUP


export const createDataTree1 = dataset => {
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

  // console.log(dataTree);

  return dataTree;
};