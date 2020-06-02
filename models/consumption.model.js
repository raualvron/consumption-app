module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            date: Date,
            consumption: Number,
            price: Number,
            cost: Number
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    schema.pre('save', async function (next) {
        var consumption = this;
        if (this.isNew) {
            try {            
                consumption._id = new mongoose.Types.ObjectId();
                return next();
            } catch (error) {
                return next(error);
            }
    
        } else {
            return next();
        }
    })
      
    const Consumption = mongoose.model("Consumption", schema);
    return Consumption;
  };