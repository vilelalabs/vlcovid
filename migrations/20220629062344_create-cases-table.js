
exports.up = function (knex) {
    return knex.schema.createTable('cases', table => {
        //location,date,variant,num_sequences,perc_sequences,num_sequences_total
        table.increments(); // "unique id"
        table.string('location');
        table.date('date').index();
        table.string('variant');
        table.integer('num_sequences');
        table.float('perc_sequences', 2);
        table.integer('num_sequences_total');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cases');
};