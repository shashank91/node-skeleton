var mongoose = require('mongoose')

var Schema = mongoose.Schema

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: { type:String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
    }
)

// Virtual for authors full name
AuthorSchema
.virtual('name')
.get(function() {
    return (this.family_name + ', ' + this.first_name)
})

AuthorSchema
.virtual('lifespan')
.get(function() {
    if (typeof this.date_of_death === 'undefined') {
        return 'undefined'
    }
    return (this.date_of_death.getYear() - this.date_of_birth.getYear())
})

AuthorSchema
.virtual('url')
.get(function() {
    return '/catalog/author/' + this.id
})

// Export model
module.exports = mongoose.model('Author', AuthorSchema)

