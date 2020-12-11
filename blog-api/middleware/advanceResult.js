const advanceResult = (model, populate) => async (ctx, next) => {
    let query;

    const reqQuery = { ...ctx.query };

    // 处理关键字
    const removeFields = ["select", "sort", "page", "limit"];
    // 清除关键字及值
    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );

    query = model.find(JSON.parse(queryStr));

    // 在query所有数据的基础上,在加条件
    if (ctx.query.select) {
        const fields = ctx.query.select.split(",").join(" ");
        query = query.select(fields);
    }

    // 处理sort排序
    if (ctx.query.sort) {
        const sortBy = ctx.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
    } else {
        query = query.sort("date");
    }

    // 分页
    const page = parseInt(ctx.query.page, 10) || 1;
    const limit = parseInt(ctx.query.limit, 10) || 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    query.skip(startIndex).limit(limit);

    // 是否关联
    if (populate) {
        query = query.populate(populate);
    }

    const results = await query;

    // 分页返回值
    const pagination = {};
    if (startIndex > 0) {
        pagination.prev = { page: page - 1, limit };
    }

    if (endIndex < total) {
        pagination.next = { page: page + 1, limit };
    }

    ctx.advancedResults = {
        success: true,
        total: total,
        pagination,
        data: results,
    };

    next();
}

module.exports = advanceResult