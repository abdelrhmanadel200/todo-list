$(document).ready(function() {
    // Toggle dark mode
    $('.dark-mode-btn').on('click', function() {
        $('body').toggleClass('dark-mode');
        $('.container').toggleClass('dark-mode');
        $('header').toggleClass('dark-mode');
        $(this).toggleClass('dark-mode');
    });

    // Add new task
    $('#add-task-btn').on('click', function() {
        var newTask = $('#new-task').val();
        if (newTask !== '') {
            var taskHTML = '<li><span>' + newTask + '</span><button class="delete-btn">Delete</button></li>';
            $('.todo-list').append(taskHTML);
            $('#new-task').val('');
        }
    });

    $('#new-task').on('keypress', function(e) {
        if (e.which === 13) {
            var newTask = $(this).val();
            if (newTask !== '') {
                var taskHTML = '<li><span>' + newTask + '</span><button class="delete-btn">Delete</button></li>';
                $('.todo-list').append(taskHTML);
                $(this).val('');
            }
        }
    });

    // Delete task
    $(document).on('click', '.delete-btn', function() {
        $(this).parent().remove();
    });

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
        $(this).parent().html('<span>' + newTaskText + '</span>' + deleteBtnHTML);
    });

    $(document).on('keypress', '.todo-list li input', function(e) {
        if (e.which === 13) {
            var newTaskText = $(this).val();
            var deleteBtnHTML = '<button class="delete-btn">Delete</button>';
            $(this).parent().html('<span>' + newTaskText + '</span>' + deleteBtnHTML);
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