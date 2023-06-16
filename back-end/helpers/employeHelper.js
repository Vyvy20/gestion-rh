export async function joursRestant(employe_id) {
    const results = await database.select("duree").from("absence").where("employe_id", employe_id)
    let duree = 0;
    results.forEach(result => {
        duree += result.duree
    });

    return parent.jours - duree
}

export async function testEmail(email) {
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    if (!emailRegex.test(email)) {
        throw new Error("email format incorect");
    }

    const result = await database.select().from("employe").where("email", email)
    if(result.length > 0) {
        throw new Error("email already taken");
    }
}

export async function testPassword(password) {
    const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "gm");
    if (!passwordRegex.test(password)) {
        throw new Error("password format incorrect.");
    }
}