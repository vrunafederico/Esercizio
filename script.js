const getTodos = async (id) => {
    const result = await fetch(`https://jsonplaceholder.typicode.com/todos/?userId=${id}`);
    const response = await result.json();
    return response;
};
  
const getUsers = async () => {
    const result = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const response = await result.json();
    return response;
};

const wrapper = async () =>{
   
    let result = await getUsers();
    let loading = document.getElementById('loading');
    let wrapper = document.getElementById('wrapper-todos');
    let select = document.createElement("select");
    wrapper.appendChild(select);

    let option = document.createElement("option")
    option.innerHTML = "--Choose an option--"
    select.appendChild(option)

    result.forEach(element => { 
        let option = document.createElement("option")
        option.value = element.id;
        option.innerHTML = element.name
        select.appendChild(option)
    });

    loading.style.display = "none";

    let ul = document.createElement("ul");

    wrapper.addEventListener("change" , async () =>{
        let list = await getTodos(select.value);
        removeAllChildNodes(ul)
        list.forEach((element) =>{
            let li = document.createElement("li");
            li.innerHTML = `${element.completed} - ${element.title}`
            ul.appendChild(li);
        })
        wrapper.appendChild(ul);
    })
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

wrapper();