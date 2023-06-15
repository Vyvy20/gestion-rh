export async function joursRestant(employe_id) {
    const results = await database.select("duree").from("absence").where("employe_id", employe_id)
    let duree = 0;
    results.forEach(result => {
        duree += result.duree
    });

    return parent.jours - duree
}