$(document).ready(function() {
    // Toggle dark mode
    $('.dark-mode-btn').on('click', function() {
        $('body').toggleClass('dark-mode');
        $('.container').toggleClass('dark-mode');
        $('header').toggleClass('dark-mode');
        $(this).toggleClass('dark-mode');
    });
    var taskCounter = 0;
    // Add new task
    $('#add-task-btn').on('click', function() {
        var newTask = $('#new-task').val();
        var dueDate = $('#due-date').val();
        if (newTask !== ' ') {
            taskCounter++;
            var taskHTML = '<li><span data-due-date="' + dueDate + '">' + taskCounter + '- ' + newTask + ' (Due: ' + dueDate + ')</span><button class="delete-btn">Delete</button></li>';
            $('.todo-list').append(taskHTML);
            $('.delete-btn').css({
                'background-color': 'red',
                'color': '#fff',
                'border': 'none',
                'padding': '10px 20px',
                'font-size': '16px',
                'cursor': 'pointer',
                'margin-left': '80%',
                'border-radius': '10px',
                'max-width': '600px'
            });
            $('.delete-btn:hover').css({
                'background-color': 'rgb(173, 0, 0)',
                'transform': 'scale(1.1)',
                'transition': 'all 0.3s ease-in-out'
            });
            $('#new-task').val('');
            $('#due-date').val('');
        }
    });

    $('#new-task').on('keypress', function(e) {
        if (e.which === 13) {
            var newTask = $(this).val();
            var dueDate = $('#due-date').val();
            if (newTask !== ' ') {
                taskCounter++;
                if (dueDate && dueDate!== ''){
                var taskHTML = '<li><span><span data-due-date="' + dueDate + '">' + taskCounter + '- ' + newTask + ' (Due: ' + dueDate + ')</span><button class="delete-btn">Delete</button></span></li>';              
                  $('.todo-list').append(taskHTML);
            }
            else{
                var taskHTML = '<li><span><span data-due-date="' + dueDate + '">' + taskCounter + '- ' + newTask + '</span><button class="delete-btn">Delete</button></span></li>';
                $('.todo-list').append(taskHTML);
            }   
                $(this).val('');
                $('#due-date').val('');
                // Add CSS styles for .delete-btn
                $('.delete-btn').css({
                    'background-color': 'red',
                    'color': '#fff',
                    'border': 'none',
                    'padding': '10px 20px',
                    'font-size': '16px',
                    'cursor': 'pointer',
                    'margin-left': '80%',
                    'border-radius': '10px',
                    'max-width': '600px'
                });
                $('.delete-btn:hover').css({
                    'background-color': 'rgb(173, 0, 0)',
                    'transform': 'scale(1.1)',
                    'transition': 'all 0.3s ease-in-out'
                });
            }
        }
    });

    // Delete task
    $(document).on('click', '.delete-btn', function() {
        var taskIndex = $(this).parent().index();
        $(this).parent().fadeToggle(500, function() {
            $(this).remove();
            updateTaskNumbers(taskIndex);
        });
    });

    // Update task numbers
    function updateTaskNumbers(startIndex) {
        var tasks = $('.todo-list li');
        for (var i = startIndex; i < tasks.length; i++) {
            var taskText = $(tasks[i]).find('span').text();
            var newTaskText = taskText.replace(/^(\d+)-/, function(match, p1) {
                return (parseInt(p1) - 1) + '- ';
            });
            $(tasks[i]).find('span').text(newTaskText);
        }
        taskCounter--; // decrement task counter
    }

    // Mark task as completed
    $(document).on('click', '.todo-list li span', function() {
        $(this).parent().toggleClass('completed');
    });

    // Edit task
    $(document).on('dblclick', '.todo-list li span', function() {
        var taskText = $(this).text();
        var inputHTML = '<input type="text" value="' + taskText + '">';
        $(this).parent().html(inputHTML);
        $(this).parent().find('input').focus();
    });
    
  
    $(document).on('blur', '.todo-list li input', function() {
        var newTaskText = $(this).val();
        var deleteBtnHTML = '<button class="delete-btn">Delete</button>';
        $(this).parent().html('<span><span>' + newTaskText + '</span>' + deleteBtnHTML+'</span>');
        $('.delete-btn').css({
            'background-color': 'red',
            'color': '#fff',
            'border': 'none',
            'padding': '10px 20px',
            'font-size': '16px',
            'cursor':'pointer',
            'margin-left': '80%',
            'border-radius': '10px',
            'max-width': '600px'
        });
        $('.delete-btn:hover').css({
            'background-color': 'rgb(173, 0, 0)',
            'transform': 'scale(1.1)',
            'transition': 'all 0.3s ease-in-out'
        });
    });

    $(document).on('keypress', '.todo-list li input', function(e) {
        if (e.which === 13) {
            var newTaskText = $(this).val();
            var deleteBtnHTML = '<button class="delete-btn">Delete</button>';
            $(this).parent().html('<span><span>' + newTaskText + '</span>' + deleteBtnHTML+'</span>');
            $('.delete-btn').css({
                'background-color': 'red',
                'color': '#fff',
                'border': 'none',
                'padding': '10px 20px',
                'font-size': '16px',
                'cursor': 'pointer',
                'margin-left': '80%',
                'border-radius': '10px',
                'max-width': '600px'
            });
            $('.delete-btn:hover').css({
                'background-color': 'rgb(173, 0, 0)',
                'transform': 'scale(1.1)',
                'transition': 'all 0.3s ease-in-out'
            });
        }
    });

    // Filter tasks
    $('#filter-tasks').on('keyup', function() {
        var filterText = $(this).val().toLowerCase();
        $('.todo-list li').each(function() {
            var taskText = $(this).text().toLowerCase();
            if (taskText.indexOf(filterText) === -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });

    // Clear completed tasks
    $('#clear-completed').on('click', function() {
        $('.todo-list li.completed').remove();
    });
});

$('#download-btn').on('click', function() {
    downloadToDoList();
});

function downloadToDoList() {
    // Generate CSV data
    var csvData = generateCsvData();

    // Create a Blob object with the CSV data
    var blob = new Blob([csvData], {
        type: 'text/csv'
    });

    // Create an anchor element with the Blob object as the href attribute
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'todo-list.csv';

    // Simulate a click event on the anchor element to download the file
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function generateCsvData() {
    // Get the list items
    var listItems = $('.todo-list li').toArray().map(function(item) {
        var taskText = $(item).find('span').text();
        var dueDate = $(item).find('span').data('due-date');
        var task = taskText.replace(/^(\d+)-/, '');
        if (dueDate && dueDate!== '') {
            return '"' + task +'"';
        } else {
            return '"' + task + '"';
        }
    });

    // Generate the CSV data
    var csvData = 'Task\n' + listItems.join('\n') + '\n';

    return csvData;
}
