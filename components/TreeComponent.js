import React from 'react';

export const TreeComponent = (tree) => {
  return (
    <li>
      <span>{tree.title}</span>
      <ul>
        {tree.hasOwnProperty('next') && tree['next'].map((item) => (
          <TreeComponent key={item.id} {...item} />
        ))}
      </ul>
    </li>
  )
}