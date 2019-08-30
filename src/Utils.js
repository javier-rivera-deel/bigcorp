const avatars = [
	"https://www.w3schools.com/howto/img_avatar.png",
	"https://www.w3schools.com/howto/img_avatar2.png",
	"https://www.w3schools.com/w3images/avatar2.png",
	"https://www.w3schools.com/w3images/avatar6.png",
	"https://www.w3schools.com/w3images/avatar5.png"
];

const randomAvatar = () => Math.floor(Math.random() * (4 - 0)) + 0;

const setUserTitle = employee => {
	const dept = employee.department ? `Dept. ${employee.department}` : "";
	const office = employee.office ? `Office ${employee.office}` : "";
	const manager = employee.manager ? `Manager: ${employee.manager}` : "";
	const title = dept + " " + office + " " + manager;
	return title;
};

const setEmployeeObjectForLibrary = employee => {
	return {
		id: employee.id,
		manager: employee.manager,
		person: {
			department: employee.id.toString(),
			name: employee.first + " " + employee.last,
			title: setUserTitle(employee),
			avatar: avatars[randomAvatar()],
			totalReports: ""
		},
		children: []
	};
};

const appendReports = employee => {
	if (employee.children.length > 0) {
		employee.person.totalReports = `${employee.children.length}`;
		employee.children.forEach(child => {
			appendReports(child);
		});
	}
	return employee;
};

export const userHasId = (employeeList, id) => {
	employeeList.forEach(employee => {
		if (employee.manager === id) return;
	});
	return false;
};

export const createDataTree = dataset => {
	if (dataset.length > 0) {
		let hashTable = {};
		let lowestManager = dataset[0].manager;

		dataset.forEach(aData => {
			if (lowestManager > aData.manager) lowestManager = aData.manager;
			hashTable[aData.id] = setEmployeeObjectForLibrary(aData);
		});
		let dataTree = [];
		dataset.forEach(data => {
			if (hashTable.hasOwnProperty(data.manager)) {
				hashTable[data.manager].children.push(hashTable[data.id]);
			} else if (data.manager === lowestManager || data.id === lowestManager) {
				dataTree.push(hashTable[data.id]);
			} else {
			}
		});
		appendReports(dataTree[0]);
		return dataTree;
	} else {
		return dataset;
	}
};

export const baseUrl =
	"https://2jdg5klzl0.execute-api.us-west-1.amazonaws.com/default/EmployeesChart-Api";

// export const setUrl = (searchType) => {
// 	let baseUrl = new URL(

// 	);
// 	if (managerSearch) {
// 		const url = `${baseUrl}?manager=${managerId}`;
// 		fetchData(url);
// 		// setState({ managerSearch: false });
// 	} else if (employeeSearch) {
// 		const url = `${baseUrl}?id=${employeeId}`;
// 		fetchData(url);
// 		// setState({ employeeSearch: false });
// 	} else if (fullSearch) {
// 		const params = { limit, offset };
// 		Object.keys(params).forEach(key =>
// 			baseUrl.searchParams.append(key, params[key])
// 		);
// 		// setState({ fullSearch: false });
// 		fetchData(baseUrl);
// 	}
// }
