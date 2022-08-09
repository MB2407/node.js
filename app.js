// @ts-check
//  <ImportConfiguration>
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const dbContext = require("./databaseContext");
//  </ImportConfiguration>

//  <DefineNewItem>
const newItem = {
  id: "7",
  department: "Gotham",
  name: "Batman",
  leaves: {
        sick: 10,
        paid: 10,
        previousYear: 20
    },
  manager: "Jim Gordon"
  
};
//  </DefineNewItem>

async function main() {
  
  // <CreateClientObjectDatabaseContainer>
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  // Make sure Tasks database is already setup. If not, create it.
  await dbContext.create(client, databaseId, containerId);
  // </CreateClientObjectDatabaseContainer>
  
  try {
    // <QueryItems>
    console.log(`Querying container: Employees`);

    // query to return all items
    const querySpec = {
      query: "SELECT * from c"
    };
    
    // read all items in the Items container
    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();

    items.forEach(item => {
    console.log(`${item.id} - ${item.name}`);
    //working
    });
    // </QueryItems>
    
    // <CreateItem>
    /** Create new item
     * newItem is defined at the top of this file
     */
    const { resource: createdItem } = await container.items.create(newItem);
    
    console.log(`\r\nCreated new item: ${createdItem?.id} - ${createdItem?.name}\r\n`);
    //not working
    
    // </CreateItem>
    
    // <UpdateItem>
    /** Update item
     * Pull the id and partition key value from the newly created item.
     * Update the isComplete field to true.
     */
    const { id, name } = createdItem;

    createdItem.leaves.sick = 12;

    const { resource: updatedItem } = await container
      .item(id, name)
      .replace(createdItem);

    console.log(`Updated item: ${updatedItem.id} - ${updatedItem.name}`); 
     //not working
    console.log(`Updated sick leaves to ${updatedItem.leaves.sick}\r\n`);
    //not working

    // </UpdateItem>
    
    // <DeleteItem>    
    /**
     * Delete item
     * Pass the id and partition key value to delete the item
     */
    //const { resource: result } = await container.item(id, name).delete();
    //console.log(`Deleted item with id: ${id}`);
    // </DeleteItem>  
    
  } catch (err) {
    console.log(err.message);
  }
}

main();