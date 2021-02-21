/* eslint-disable max-lines-per-function,no-await-in-loop */
import { orderBy } from '../../helpers/array/orderBy'
import { addProperty } from '../../helpers/object/addProperty'
import { deleteProperty } from '../../helpers/object/deleteProperty'
import { ISchema, ISchemaCommand } from '../../types'
import { createFilesFromFolder } from '../files/createFromFolder'
import { logger } from '../logger'
import { reporter } from '../reporter'
import {
  addDependencies,
  moveToDevDependencies,
  removeDependencies,
} from '../shell/dependencies'
import { execWithSpinner } from '../shell/exec'
import { execInProjectWithSpinner } from '../shell/execProject'
import { updateJson } from '../updateJson'

export const execute = async (schema: ISchema, projectFolder: string) => {
  reporter.info(`Running ${schema.name}`)

  try {
    //
    // Execute commands
    //

    const commands = orderBy<ISchemaCommand>('priority')(schema.commands)
    for (const command of commands) {
      if (command.shouldRunInProject) {
        await execInProjectWithSpinner(projectFolder)(
          command.command,
          command.successMessage
        )
      } else {
        await execWithSpinner(command.command, command.successMessage)
      }
    }

    //
    // Add new project files
    //

    for (const template of schema.files.add) {
      await createFilesFromFolder({
        name: template.label,
        projectFolder,
        source: template.source,
        context: template.context,
      })
    }

    //
    // Update json files
    //

    for (const file of Object.keys(schema.jsonFiles)) {
      await updateJson(
        {
          projectFolder,
          fileName: file,
          message: `[json] cleaning ${file}`,
          messageSuccess: `[json] clean ${file}`,
        },
        (content) => {
          let updatedContent = { ...content }

          const propertiesToRemove = schema.jsonFiles[file]?.remove
          const propertiesToAdd = schema.jsonFiles[file]?.add

          if (propertiesToRemove) {
            for (const propertyPath of propertiesToRemove) {
              updatedContent = deleteProperty(updatedContent, propertyPath)
            }
          }

          if (propertiesToAdd) {
            for (const property of propertiesToAdd) {
              updatedContent = addProperty(
                property.path,
                property.value
              )(updatedContent)
            }
          }

          return updatedContent
        }
      )
    }

    //
    // Move dependencies to dev dependencies
    //

    await moveToDevDependencies({
      projectFolder,
      libraries: schema.dependencies.move.prod,
    })

    //
    // Install dependencies
    //

    await addDependencies({
      projectFolder,
      libraries: schema.dependencies.add.prod,
    })
    await addDependencies({
      projectFolder,
      libraries: schema.dependencies.add.dev,
      isDev: true,
    })

    //
    // Remove dependencies
    //

    await removeDependencies({
      projectFolder,
      libraries: schema.dependencies.remove,
    })

    logger.success('Success')
    reporter.info(`Finished ${schema.name}`)
  } catch (error) {
    const message = `

      Error! Thank you for wasting your time on @compgen. 👀 I just sent a notification
      to developer239 with debug information.

      In the meantime, try running the generator with different parameters. In some cases 3rd party CLI tools can
      produce different output than what @compgen expects.
    `

    logger.error(message)
    reporter.error(`Failed ${schema.name}

${JSON.stringify(
  {
    message,
    error,
    schema,
  },
  null,
  2
)}
    `)
  }
}
