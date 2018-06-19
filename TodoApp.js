class TodoApp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            text: "",
            items: [ ],
            id: 0
        }
    }

    handleSubmit(e){
        e.preventDefault();

        if(this.state.text.match(/^[^\s]+\w+/gi)){
            const newItem = {
                text: this.state.text,
                id: this.state.id
            }

            this.setState({
                items: this.state.items.concat(newItem),
                text: " ",
                id: this.state.id + 1
            });
        }
    }

    handleChange(e){
        this.setState({text: e.target.value});
    }

    render(){
        return(
            <div>
              <h3>ToDo List</h3>
              <TodoList list={this.state.items}/>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <input onChange={this.handleChange.bind(this)} value={this.state.text} placeholder="Add New Item"/>
                <button>Add</button>
              </form>
            </div>
        );
    }
}

class TodoList extends React.Component {
    render(){
        return(
            <ul>
              {this.props.list.map(item => {
                  return <TodoListItem text={item.text} key={item.id} id={item.id}/>
              })}
            </ul>
        );
    }
}

class TodoListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            amDone: false
        }
    }

    handleClick(){
        this.setState({
            amDone: !this.state.amDone
        });
    }

    render(){
        const line = (this.state.amDone) ? "line-through" : "none";
        return(
            <li onClick={this.handleClick.bind(this)}
                style={{textDecoration: line}}>{this.props.text}</li>
        );
    }
}