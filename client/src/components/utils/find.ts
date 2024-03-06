

interface FindProps {
    field: string,
    condition: string
}
export const find = (props: FindProps, entities :any) => {
    const returnEntities = entities.filter((entity:any) => {
        return entity[props.field].toLowerCase().includes(props.condition.toLowerCase()); 
    });
    return returnEntities;
}