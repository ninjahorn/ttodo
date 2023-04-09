#!/usr/bin/env node

//-------------------VARIABLES-------------------
var fs = require('fs')
const program = require('commander');


//save todolist.json into an array
var todolist = JSON.parse(fs.readFileSync(__dirname + '/todolist.json'))


//-------------------FUNCTIONS-------------------
function addTask(task) {
    todolist.push(task)
    fs.writeFileSync(__dirname + '/todolist.json', JSON.stringify(todolist), 'utf-8', (err) => {
        if (err) {
            return console.log(err)
        } 
    })
    console.log('Added --' + task + '--')

}


function removeTask(task) {
    if (parseInt(task) < 50) {
        todolist.splice(parseInt(task - 1), 1)
    }

    if (Number.isInteger(task)) {
        console.log(5555)
        if (parseInt(task) < 50) {
            todolist.splice(parseInt(task), 1)
        }
    }

    todolist = todolist.filter(item => item !== task)
    fs.writeFileSync(__dirname + '/todolist.json', JSON.stringify(todolist), 'utf-8', (err) => {
        if (err) {
            return console.log(err)
        } 
    })
    console.log('Removed --' + task + '--')
}


function listTodo() {
    console.log('\n')
    console.log('----------')
    console.log('LENGHT: ' + todolist.length + ' |')
    console.log('----------')
    for (i = 0; i < todolist.length; i++) {
        console.log(i+1 + ' | ' + todolist[i])
        console.log('---')
    }
    console.log('\n')

}


//-------------------COMMANDS-------------------
program
    .version('1.0.0')
    .description('Basic CLI ToDo list')

program
    .command('add')
    .alias('a')
    .description('Add a task to the todo list')
    .argument('<task>')
    .action(function(task){
        addTask(task)
    })

program
    .command('remove')
    .alias('rem')
    .alias('r')
    .description('Remove a task from the todo list')
    .argument('<task>')
    .action(function(task) {
        removeTask(task)
    })

program
    .command('list')
    .alias('l')
    .description('Show todo list')
    .action(function() {
        listTodo()
    })

program.parse(process.argv);
